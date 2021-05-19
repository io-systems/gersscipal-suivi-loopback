// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, param} from '@loopback/rest';
import {promises as fsp} from 'fs';
import {HmiRecipeRepository, WorkstationRepository} from '../repositories';

export class HmiRecipeFileController {
  path: string = process.env.LB_FILE_PATH || '/home/jledun/io-suivi/files/';
  indexes: number[] = [];

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
    return fsp.readdir(this.path);
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
    return new Promise(async (resolve, reject): Promise<any> => {
      // génération du nom du fichier
      const d = new Date();
      let fileName = [
        d.getFullYear(),
        ((d.getMonth() + 1).toString().length < 2) ? `0${(d.getMonth() + 1).toString()}` : `${(d.getMonth() + 1).toString()}`,
        (d.getDate().toString().length < 2) ? `0${d.getDate().toString()}` : `${d.getDate().toString()}`,
      ].join('');
      try {
        let fileList = await fsp.readdir(this.path);
        fileList = fileList.filter(file => file.includes(fileName));
        fileName = [
          "recette",
          fileName,
          fileList.length.toString().padStart(3, "0")
        ].join("_").concat(".csv");

        // génération du fichier csv
        // lecture des postes de travail disponibles sur l'application
        const workstations = await this.wsdb.find();
        let recipes = [];
        for (let ws of workstations) {
          let wsrecipes = await this.rdb.find({
            where: {
              codem: ws.codem
            }
          });
          // génération des lignes csv avec chaînes autocomplétées avec des espaces sur la longueur totale de la chaîne
          recipes.push(
            [
              `"${ws.codem.padEnd(8, " ")}"`,
            ].concat(
              this.indexes.map(i => {
                const t = wsrecipes.findIndex(wsr => wsr.index === i);
                if (t > -1) {
                  return [
                    `"${wsrecipes[t].operation.padEnd(8, " ")}"`,
                    `"${wsrecipes[t].alea.padEnd(8, " ")}"`,
                    `"${wsrecipes[t].label.padEnd(32, " ")}"`
                  ];
                } else {
                  return [
                    `"${"".padEnd(8, " ")}"`,
                    `"${"".padEnd(8, " ")}"`,
                    `"${"".padEnd(32, " ")}"`
                  ];
                }
              }).flat()
            ).flat().join(", ")
          );
        }

        // écriture du fichier
        await fsp.writeFile(this.path.concat(fileName), recipes.join("\n").concat("\n"));

      } catch (e) {
        return reject(e);
      }
      return resolve({filename: fileName});
    });
  }

}
