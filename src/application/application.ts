import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { router } from '../main/routes';

const application = express();

application.use(bodyParser.text());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(cors());
application.use(router);

application.set('port', process.env.APPLICATION_PORT || 5000);

export { application };
