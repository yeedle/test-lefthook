### -*- docker-image-name: "foobar" -*-


## Template values
ARG SERVICE_NAME='foobar'
ARG SERVICE_REPO='https://github.com/trialspark/foobar'

## Source image versions
ARG debian_version='bullseye-slim'
ARG node_image_tag='16-bullseye-slim'

## Program versions
ARG bimini_version='0.4.1'
ARG vault_env_exec_version='0.3.1'

## Metadata tags
ARG org_opencontainers_image_created
ARG org_opencontainers_image_version
ARG org_opencontainers_image_revision

## Build Configurations
ARG aws_codeartifact_auth_token=''


### Source image for shared files between all exported containers.

FROM debian:${debian_version} AS image-source

ARG bimini_version
ARG vault_env_exec_version

RUN set -eux; \
    \
    export TERM=xterm; \
    export DEBIAN_FRONTEND=noninteractive; \
    \
    apt-get update; \
    apt-get install -y ca-certificates

ADD "https://github.com/trialspark/vault-env-exec/releases/download/${vault_env_exec_version}/vault-env-exec-linux-amd64" /sbin/vault-env-exec
ADD "https://github.com/trialspark/bimini/releases/download/v${bimini_version}/bimini-x86_64-unknown-linux-gnu" /sbin/bimini

RUN install --verbose --mode=555 -D /sbin/vault-env-exec /image-root/sbin/vault-env-exec
RUN install --verbose --mode=555 -D /sbin/bimini /image-root/sbin/bimini
RUN install --verbose --mode=444 -D /etc/ssl/certs/ca-certificates.crt /image-root/etc/ssl/certs/ca-certificates.crt


## Base JavaScript image with production dependencies installed.

FROM node:${node_image_tag} AS base

ARG aws_codeartifact_auth_token
ARG org_opencontainers_image_created
ARG org_opencontainers_image_version
ARG org_opencontainers_image_revision

ENV NODE_ENV=production

COPY package.json yarn.lock .npmrc /opt/app/

WORKDIR /opt/app

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    set -eu; \
    \
    export AWS_CODEARTIFACT_AUTH_TOKEN=${aws_codeartifact_auth_token}; \
    \
    yarn install --frozen-lockfile --non-interactive;

COPY --from=image-source /image-root/ /

LABEL \
    org.opencontainers.image.vendor="TrialSpark Inc." \
    org.opencontainers.image.url="${SERVICE_REPO}" \
    org.opencontainers.image.documentation="${SERVIE_REPO}/blob/main/README.md" \
    org.opencontainers.image.source="${SERVICE_REPO}/blob/main/container/Dockerfile" \
    org.opencontainers.image.created="${org_opencontainers_image_created}" \
    org.opencontainers.image.version="${org_opencontainers_image_version}" \
    org.opencontainers.image.revision="${org_opencontainers_image_revision}"


## Build artifacts

FROM base AS build-artifacts

ENV NODE_ENV=development
COPY . /opt/app/

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    set -eu; \
    \
    export AWS_CODEARTIFACT_AUTH_TOKEN=${aws_codeartifact_auth_token}; \
    \
    yarn install --frozen-lockfile --non-interactive; \
    yarn run build; \
    \
    chown -R node:node /opt/app/.mikro_orm_cache;

## Bundle image files
RUN find \
    /opt/app/dist \
    /opt/app/.mikro_orm_cache \
    /opt/app/src/graphql.ts \
    /opt/app/client \
    -type d \( -name migrations -o -name seeders \) -prune -o \
    \( -name '*.graphql' -o -name '*.json' -o -name '*.js' -o -name '*.map' -o -name '*.ts' -o -name '*.handlebars' -o -name '*.tsbuildinfo' \) -type f \
    -exec install --verbose --mode=444 -D "{}" "/image-root{}" \;;


## Construct migration runner

## NB. Mikro ORM is a development dependency for nest-js projects so this is a
## fairly large image.

FROM build-artifacts AS migration-runner

ENV \
    MIKRO_ORM_MIGRATIONS_DISABLE_FOREIGN_KEYS='false' \
    NODE_ENV=production

USER node
ENTRYPOINT ["/usr/local/bin/yarn", "mikro-orm"]
CMD ["migration:up"]

LABEL \
    org.opencontainers.image.title="${SERVICE_NAME} Migration Runner" \
    org.opencontainers.image.description="${SERVICE_NAME} database migration runner."


## Construct final deploy image

FROM base AS image

COPY --from=build-artifacts /image-root/ /

USER node
ENTRYPOINT ["/usr/local/bin/yarn", "run"]
CMD ["start:prod"]

LABEL \
    org.opencontainers.image.title="${SERVICE_NAME}" \
    org.opencontainers.image.description=""
