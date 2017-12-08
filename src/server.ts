import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ApplicationModule } from './modules/app.module';

const app = express();

// Express middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(3000);
}
bootstrap();
