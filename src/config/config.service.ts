import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './interface/envconfig.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constante';
import { ConfigOptions } from './interface/config-options.interface';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  //   constructor() {
  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    // const options = 'config'; // config = nom du folder à aller chercher
    // const fileName = '.env';
    const fileName = `${process.env.NODE_ENV || ''}.env`;
    // const filePath = path.resolve(__dirname, '../..', options, fileName);
    // const filePath = path.resolve(__dirname, '../..', options.folder, fileName);
    // Correction : pour résoudre l'erreur qui apparaît lorsque npm run build est lancé avec les scripts de migration, on utilise process.cwd() pour toujours chercher le fichier à la racine, ceci car lorsqu'il y a un dist généré, cela rajoute une couche de folder, et le .env n'est plus trouvé
    const filePath = path.resolve(process.cwd(), options.folder, fileName);
    // Ccorrection du code dispo
    // const filePath = path.resolve(
    //   __dirname,
    //   '../../..',
    //   options.folder,
    //   fileName,
    // );
    // this.envConfig = {};
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
