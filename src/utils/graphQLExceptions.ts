import mercurius from 'mercurius';

export class GraphQLBadRequestException extends mercurius.ErrorWithProps {
  constructor(message: string, extensions?: object) {
    super(message, extensions, 400);
  }
}
