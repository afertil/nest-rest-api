import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { ApplicationModule } from './modules/app.module';

const exp = express();

// Express middleware.
exp.use(bodyParser.json());
exp.use(bodyParser.urlencoded({ extended: false }));
exp.use(cors());

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule, exp);
	await app.listen(3000);
}

bootstrap();
