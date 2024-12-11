
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private logger = new Logger('HTTP')

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const res = exception.getResponse();
        response
            .status(status)
            .json(res);

        this.logger.error(`Logging HTTP Request Error ${request.method} ${request.url} ${status}`,res['message']??'')
    }
}
