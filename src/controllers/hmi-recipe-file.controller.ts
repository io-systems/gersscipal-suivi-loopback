/* eslint-disable @typescript-eslint/no-misused-promises */
// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, param} from '@loopback/rest';
import {promises as fsp} from 'fs';
import {HmiRecipeRepository, WorkstationRepository} from '../repositories';

export class HmiRecipeFileController {
  path: string = process.env.LB_FILE_PATH || '/home/jledun/io-suivi/files/';
  indexes: number[] = [];
  prefixParamIO = "ParametresIO";
  prefixTagsBoutons = "TagsBouton";

  constructor(
    @repository(HmiRecipeRepository) protected rdb: HmiRecipeRepository,
    @repository(WorkstationRepository) protected wsdb: WorkstationRepository,
  ) {
    for (let i = 0; i < 32; i++) this.indexes.push(i);
  }

  @get('/hmi-recipe-file', {
    responses: {
      '200': {
        description: "get csv file list hosted on the server",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              title: 'file list',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  })
  async getFileList(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileList = await fsp.readdir(this.path);
        return resolve(fileList.filter(file => file.includes(this.prefixParamIO) || file.includes(this.prefixTagsBoutons)));
      } catch (e) {
        return reject(e);
      }
    });
  }

  @get('/hmi-recipe-file/{filename}', {
    responses: {
      '200': {
        description: "download csv file",
        content: {
          'application/csv': {
            schema: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    }
  })
  async getFile(
    @param.path.string('filename') filename: string
  ): Promise<any> {
    return fsp.readFile(this.path.concat(filename));
  }

  @del('/hmi-recipe-file/{filename}', {
    responses: {
      '200': {
        description: "delete a csv file list hosted on the server",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              title: 'file list',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  })
  async deleteFile(
    @param.path.string('filename') filename: string
  ): Promise<string[]> {
    await fsp.rm(this.path.concat(filename));
    return this.getFileList();
  }

  @get('/hmi-recipe-file/create-csv-file', {
    responses: {
      '200': {
        description: "get csv file list hosted on the server",
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                'filename': {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  createCsvFile(): Promise<any> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject): Promise<any> => {
      // détermination de la date du fichier en cours de création
      const d = new Date();
      const fileDate = [
        d.getFullYear(),
        ((d.getMonth() + 1).toString().length < 2) ? `0${(d.getMonth() + 1).toString()}` : `${(d.getMonth() + 1).toString()}`,
        (d.getDate().toString().length < 2) ? `0${d.getDate().toString()}` : `${d.getDate().toString()}`,
      ].join('');
      let fileName = fileDate;

      // configuration des langues de l'application
      const langs: any[] = [
        {id: 1, language: 'Français', locale: 'FRA'},
        {id: 2, language: 'Hongrois', locale: 'FRA'},
        {id: 3, language: 'Anglais', locale: 'ENU'},
      ];

      try {
        /* ********************************************* *
         * TRAITEMENT PARAMETRAGE DES ENTREES ET SORTIES *
         * ********************************************* */
        // lecture des fichiers dans le répertoire
        let fileList = await fsp.readdir(this.path);
        fileList = fileList.filter(file => file.includes(`${this.prefixParamIO}_${fileDate}`));

        // détermination de la version du fichier
        let fileNumber = 0;
        if (fileList && fileList.length > 0) {
          fileNumber = Number(fileList[fileList.length - 1].split('.')[0].split('_')[2]);
        }

        // calcul du nom du fichier pour le paramétrage des entrées et sorties
        fileName = [
          this.prefixParamIO,
          fileDate,
          (fileNumber + 1).toString().padStart(3, "0")
        ].join("_").concat('.csv');

        // génération des données csv
        // lecture des postes de travail disponibles sur l'application
        const workstations = await this.wsdb.find();
        let recipes: string[] = [];
        let index = 1;
        recipes.push('Common Recipe;V2;ParametresIO;NormalRecipe;0;Conditional;Vijeo-Designer 6.2.6');
        recipes.push('\n');

        // RECIPE BLOCK
        recipes.push('#RECIPEBLOCK;RecipeName;RecipeID;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmLabels;_SoM.HMISCUxA5.Application.GVL.CODEM');
        recipes.push('DataType;;;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING');
        recipes.push('Minimum;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
        recipes.push('Maximum;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
        for (const ws of workstations) {
          // lecture paramétrage pour la workstation sélectionnée
          const wsrecipes = await this.rdb.find({
            where: {
              codem: ws.codem
            }
          });

          // génération des lignes de recette csv avec chaînes autocomplétées avec des espaces sur la longueur totale de la chaîne
          recipes.push(
            [
              'RecipeSet',
              `${ws.codem}`,
              index.toString()
            ].concat(
              this.indexes.map(i => {
                const t = wsrecipes.findIndex(wsr => wsr.index === i);
                if (t > -1) {
                  return [
                    `${wsrecipes[t].operation.padEnd(8, ' ')}`,
                    `${wsrecipes[t].alea.padEnd(8, ' ')}`,
                    `${wsrecipes[t].label.padEnd(32, ' ')}`
                  ];
                } else {
                  return [
                    `${"".padEnd(8, ' ')}`,
                    `${"".padEnd(8, ' ')}`,
                    `${"".padEnd(32, ' ')}`
                  ];
                }
              }).flat()
            ).concat([
              `${ws.codem.padEnd(8, ' ')}`
            ]).flat().join(';')
          );
          index++;
        }
        recipes.push('#ENDRECIPEBLOCK');
        recipes.push('\n');
        // RECIPE BLOCK

        // INGREDIENT LABEL BLOCK
        recipes.push('#INGREDIENTLABELBLOCK;Locale;LanguageID;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[0].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[1].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[2].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[3].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[4].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[5].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[6].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[7].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[8].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[9].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[10].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[11].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[12].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[13].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[14].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[15].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[16].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[17].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[18].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[19].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[20].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[21].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[22].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[23].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[24].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[25].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[26].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[27].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[28].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[29].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[30].ihmLabels;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmOperations;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmAlea;_SoM.HMISCUxA5.Application.GVL.ihmMessages[31].ihmLabels;_SoM.HMISCUxA5.Application.GVL.CODEM');
        for (const lang of langs) {
          recipes.push(`${lang.language};${lang.locale};${lang.id};` + 'ihmOperations[0];ihmAlea[0];ihmLabels[0];ihmOperations[1];ihmAlea[1];ihmLabels[1];ihmOperations[2];ihmAlea[2];ihmLabels[2];ihmOperations[3];ihmAlea[3];ihmLabels[3];ihmOperations[4];ihmAlea[4];ihmLabels[4];ihmOperations[5];ihmAlea[5];ihmLabels[5];ihmOperations[6];ihmAlea[6];ihmLabels[6];ihmOperations[7];ihmAlea[7];ihmLabels[7];ihmOperations[8];ihmAlea[8];ihmLabels[8];ihmOperations[9];ihmAlea[9];ihmLabels[9];ihmOperations[10];ihmAlea[10];ihmLabels[10];ihmOperations[11];ihmAlea[11];ihmLabels[11];ihmOperations[12];ihmAlea[12];ihmLabels[12];ihmOperations[13];ihmAlea[13];ihmLabels[13];ihmOperations[14];ihmAlea[14];ihmLabels[14];ihmOperations[15];ihmAlea[15];ihmLabels[15];ihmOperations[16];ihmAlea[16];ihmLabels[16];ihmOperations[17];ihmAlea[17];ihmLabels[17];ihmOperations[18];ihmAlea[18];ihmLabels[18];ihmOperations[19];ihmAlea[19];ihmLabels[19];ihmOperations[20];ihmAlea[20];ihmLabels[20];ihmOperations[21];ihmAlea[21];ihmLabels[21];ihmOperations[22];ihmAlea[22];ihmLabels[22];ihmOperations[23];ihmAlea[23];ihmLabels[23];ihmOperations[24];ihmAlea[24];ihmLabels[24];ihmOperations[25];ihmAlea[25];ihmLabels[25];ihmOperations[26];ihmAlea[26];ihmLabels[26];ihmOperations[27];ihmAlea[27];ihmLabels[27];ihmOperations[28];ihmAlea[28];ihmLabels[28];ihmOperations[29];ihmAlea[29];ihmLabels[29];ihmOperations[30];ihmAlea[30];ihmLabels[30];ihmOperations[31];ihmAlea[31];ihmLabels[31];codem');
        }
        recipes.push('#ENDINGREDIENTLABELBLOCK');
        recipes.push('\n');
        recipes.push('#RECIPELABELBLOCK;Locale;LanguageID');
        for (const lang of langs) {
          recipes.push(`${lang.language};${lang.locale};${lang.id};`.concat(workstations.map(ws => ws.codem).join(';')));
        }
        recipes.push('#ENDRECIPELABELBLOCK');
        recipes.push('\n');
        // INGREDIENT LABEL BLOCK

        // RECIPE GROUP LABEL BLOCK
        recipes.push('#RECIPEGROUPLABELBLOCK;Locale;LanguageID;ParametresIO');
        recipes.push(`${langs[0].language};${langs[0].locale};${langs[0].id};` + 'Paramètres IO');
        recipes.push(`${langs[1].language};${langs[1].locale};${langs[1].id};` + 'Bemeneti és kimeneti paraméterek');
        recipes.push(`${langs[2].language};${langs[2].locale};${langs[2].id};` + 'IO settings');
        recipes.push('#ENDRECIPEGROUPLABELBLOCK');
        recipes.push('\n');
        // RECIPE GROUP LABEL BLOCK

        // jonction finale de toutes les lignes du ficher
        let data2Write = recipes.join('\n');

        // écriture du fichier de paramétrage des entrées et sorties
        await fsp.writeFile(this.path.concat(fileName), data2Write, 'ascii');


        /* *************************** *
         * TRAITEMENT TAGS DES BOUTONS *
         * *************************** */
        // lecture des fichiers dans le répertoire
        fileList = await fsp.readdir(this.path);
        fileList = fileList.filter(file => file.includes(`${this.prefixTagsBoutons}_${fileDate}`));

        // détermination de la version du fichier
        fileNumber = 0;
        if (fileList && fileList.length > 0) {
          fileNumber = Number(fileList[fileList.length - 1].split('.')[0].split('_')[2]);
        }

        // calcul du nom du fichier pour le paramétrage des entrées et sorties
        fileName = [
          this.prefixTagsBoutons,
          fileDate,
          (fileNumber + 1).toString().padStart(3, "0")
        ].join("_").concat('.csv');

        // génération des données csv
        // nouvelles initialisations
        recipes = [];
        index = 1;
        recipes.push('Common Recipe;V2;TagsBouton;NormalRecipe;0;Conditional;Vijeo-Designer 6.2.6');
        recipes.push('\n');

        // RECIPE BLOCK
        recipes.push('#RECIPEBLOCK;RecipeName;RecipeID;buttons_FR[0];buttons_HU[0];buttons_EN[0];buttons_FR[1];buttons_HU[1];buttons_EN[1];buttons_FR[2];buttons_HU[2];buttons_EN[2];buttons_FR[3];buttons_HU[3];buttons_EN[3];buttons_FR[4];buttons_HU[4];buttons_EN[4];buttons_FR[5];buttons_HU[5];buttons_EN[5];buttons_FR[6];buttons_HU[6];buttons_EN[6];buttons_FR[7];buttons_HU[7];buttons_EN[7];buttons_FR[8];buttons_HU[8];buttons_EN[8];buttons_FR[9];buttons_HU[9];buttons_EN[9];buttons_FR[10];buttons_HU[10];buttons_EN[10];buttons_FR[11];buttons_HU[11];buttons_EN[11];buttons_FR[12];buttons_HU[12];buttons_EN[12];buttons_FR[13];buttons_HU[13];buttons_EN[13];buttons_FR[14];buttons_HU[14];buttons_EN[14];buttons_FR[15];buttons_HU[15];buttons_EN[15]');
        recipes.push('DataType;;;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING;STRING');
        recipes.push('Minimum;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
        recipes.push('Maximum;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
        for (const ws of workstations) {
          // lecture paramétrage pour la workstation sélectionnée
          const wsrecipes = await this.rdb.find({
            where: {
              codem: ws.codem
            }
          });

          // génération des lignes de recette csv avec chaînes sans completion
          recipes.push(
            [
              'RecipeSet',
              `${ws.codem}`,
              index.toString()
            ].concat(
              this.indexes.filter(i => i > 15).map(i => {
                const t = wsrecipes.findIndex(wsr => wsr.index === i);
                if (t > -1) {
                  return [
                    `${wsrecipes[t].btnTextFR}`,
                    `${wsrecipes[t].btnTextHU}`,
                    `${wsrecipes[t].btnTextEN}`
                  ];
                } else {
                  return [
                    ' ',
                    ' ',
                    ' '
                  ];
                }
              }).flat()
            ).flat().join(';')
          );
          index++;
        }
        recipes.push('#ENDRECIPEBLOCK');
        recipes.push('\n');
        // RECIPE BLOCK

        // INGREDIENT LABEL BLOCK
        recipes.push('#INGREDIENTLABELBLOCK;Locale;LanguageID;buttons_FR[0];buttons_HU[0];buttons_EN[0];buttons_FR[1];buttons_HU[1];buttons_EN[1];buttons_FR[2];buttons_HU[2];buttons_EN[2];buttons_FR[3];buttons_HU[3];buttons_EN[3];buttons_FR[4];buttons_HU[4];buttons_EN[4];buttons_FR[5];buttons_HU[5];buttons_EN[5];buttons_FR[6];buttons_HU[6];buttons_EN[6];buttons_FR[7];buttons_HU[7];buttons_EN[7];buttons_FR[8];buttons_HU[8];buttons_EN[8];buttons_FR[9];buttons_HU[9];buttons_EN[9];buttons_FR[10];buttons_HU[10];buttons_EN[10];buttons_FR[11];buttons_HU[11];buttons_EN[11];buttons_FR[12];buttons_HU[12];buttons_EN[12];buttons_FR[13];buttons_HU[13];buttons_EN[13];buttons_FR[14];buttons_HU[14];buttons_EN[14];buttons_FR[15];buttons_HU[15];buttons_EN[15]');
        recipes.push(`${langs[0].language};${langs[0].locale};${langs[0].id};` + 'TagFR_0;TagHU_0;TagEN_0;TagFR_1;TagHU_1;TagEN_1;TagFR_2;TagHU_2;TagEN_2;TagFR_3;TagHU_3;TagEN_3;TagFR_4;TagHU_4;TagEN_4;TagFR_5;TagHU_5;TagEN_5;TagFR_6;TagHU_6;TagEN_6;TagFR_7;TagHU_7;TagEN_7;TagFR_8;TagHU_8;TagEN_8;TagFR_9;TagHU_9;TagEN_9;TagFR_10;TagHU_10;TagEN_10;TagFR_11;TagHU_11;TagEN_11;TagFR_12;TagHU_12;TagEN_12;TagFR_13;TagHU_13;TagEN_13;TagFR_14;TagHU_14;TagEN_14;TagFR_15;TagHU_15;TagEN_15');
        recipes.push(`${langs[1].language};${langs[1].locale};${langs[1].id};` + 'TagFR_0;TagHU_0;TagEN_0;TagFR_1;TagHU_1;TagEN_1;TagFR_2;TagHU_2;TagEN_2;TagFR_3;TagHU_3;TagEN_3;TagFR_4;TagHU_4;TagEN_4;TagFR_5;TagHU_5;TagEN_5;TagFR_6;TagHU_6;TagEN_6;TagFR_7;TagHU_7;TagEN_7;TagFR_8;TagHU_8;TagEN_8;TagFR_9;TagHU_9;TagEN_9;TagFR_10;TagHU_10;TagEN_10;TagFR_11;TagHU_11;TagEN_11;TagFR_12;TagHU_12;TagEN_12;TagFR_13;TagHU_13;TagEN_13;TagFR_14;TagHU_14;TagEN_14;TagFR_15;TagHU_15;TagEN_15');
        recipes.push(`${langs[2].language};${langs[2].locale};${langs[2].id};` + 'TagFR_0;TagHU_0;TagEN_0;TagFR_1;TagHU_1;TagEN_1;TagFR_2;TagHU_2;TagEN_2;TagFR_3;TagHU_3;TagEN_3;TagFR_4;TagHU_4;TagEN_4;TagFR_5;TagHU_5;TagEN_5;TagFR_6;TagHU_6;TagEN_6;TagFR_7;TagHU_7;TagEN_7;TagFR_8;TagHU_8;TagEN_8;TagFR_9;TagHU_9;TagEN_9;TagFR_10;TagHU_10;TagEN_10;TagFR_11;TagHU_11;TagEN_11;TagFR_12;TagHU_12;TagEN_12;TagFR_13;TagHU_13;TagEN_13;TagFR_14;TagHU_14;TagEN_14;TagFR_15;TagHU_15;TagEN_15');
        recipes.push('#ENDINGREDIENTLABELBLOCK');
        recipes.push('\n');
        recipes.push('#RECIPELABELBLOCK;Locale;LanguageID');
        for (const lang of langs) {
          recipes.push(`${lang.language};${lang.locale};${lang.id};`.concat(workstations.map(ws => ws.codem).join(';')));
        }
        recipes.push('#ENDRECIPELABELBLOCK');
        recipes.push('\n');
        // INGREDIENT LABEL BLOCK

        // RECIPE GROUP LABEL BLOCK
        recipes.push('#RECIPEGROUPLABELBLOCK;Locale;LanguageID;TagsBouton');
        recipes.push(`${langs[0].language};${langs[0].locale};${langs[0].id};` + 'Titre des boutons IHM');
        recipes.push(`${langs[1].language};${langs[1].locale};${langs[1].id};` + 'A HMI gombok címe');
        recipes.push(`${langs[2].language};${langs[2].locale};${langs[2].id};` + 'IHM buttons tags');
        recipes.push('#ENDRECIPEGROUPLABELBLOCK');
        recipes.push('\n');
        // RECIPE GROUP LABEL BLOCK

        // jonction finale de toutes les lignes du ficher
        data2Write = recipes.join('\n');

        // écriture du fichier des tags des boutons IHM
        await fsp.writeFile(this.path.concat(fileName), data2Write, 'ascii');

      } catch (e) {
        return reject(e);
      }
      return resolve({filename: fileName});
    });
  }

}
