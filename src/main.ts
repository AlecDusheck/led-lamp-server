import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { v4 as uuidv4 } from 'uuid';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Init handle bars and layouts
  app.setViewEngine('hbs');
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.use(
      session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: false,
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
