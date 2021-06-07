// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {
  del, get, param,
  response,
  Response, RestBindings
} from '@loopback/rest';
import {promises as fsp} from 'fs';
import {MessageHistory} from '../models';
import {MessageHistoryRepository} from '../repositories';

interface divaltoMessage {
  ofnr?: string,
  operation?: string,
  activite?: string,
  debut?: string,
  fin?: string
}

export class MessageHistoryFileController {
  path: string = process.env.LB_FILE_PATH || '/home/jledun/io-suivi/files/';
  prefix = "alea";

  constructor(
    @repository(MessageHistoryRepository)
    public messageHistoryRepository: MessageHistoryRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) { }

  @get('/message-history-file', {
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
  getFileList(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileList = await fsp.readdir(this.path);
        return resolve(fileList.filter(file => file.includes(this.prefix)));
      } catch (e) {
        return reject(e);
      }
    });
  }

  @get('/message-history-file/{filename}')
  @response(200, {
    description: 'Download exported messages',
    content: {
      'application/csv': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    },
  })
  async export(
    @param.path.string('filename') filename: string
  ): Promise<any> {
    return fsp.readFile(this.path.concat(filename));
  }

  @del('/message-history-file/{filename}', {
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

  @get('/message-history-file/create-divalto-export')
  @response(200, {
    description: "create a new export file for divalto based on filtered datas",
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            filename: {
              type: 'string'
            }
          }
        }
      }
    }
  })
  createDivaltoExport(
    @param.filter(MessageHistory) filter?: Filter<MessageHistory>,
  ): Promise<any> {
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
        fileList = fileList.filter(file => file.includes(`${this.prefix}_${fileName}`));
        let fileNumber = 0;
        if (fileList && fileList.length > 0) {
          fileNumber = Number(fileList[fileList.length - 1].split(".")[0].split("_")[2]);
        }
        fileName = [
          this.prefix,
          fileName,
          (fileNumber + 1).toString().padStart(3, "0")
        ].join("_").concat(".csv");

        // filtrage par défaut
        const fil: Filter<MessageHistory> = filter || {};
        fil.order = ["timestamp ASC"];

        // lecture des messages filtrées
        let filteredMessages: any[] = await this.messageHistoryRepository.find(fil);

        // calcul des horodatages début et fin
        filteredMessages = filteredMessages.map(message => {
          const tmp = {
            start: "",
            end: ""
          };
          if (message.value > 0) {
            tmp.start = message.timestamp;
          } else {
            tmp.end = message.timestamp;
          }
          return Object.assign({}, message, tmp);
        });

        // jonction des messages identiques avec start et end
        const exported: any[] = [];
        filteredMessages.forEach(message => {
          if (message.value > 0) {
            exported.push(message);
          } else {
            const index = [...exported].reverse().findIndex(m => m.alea === message.alea && m.value > 0);
            if (index > -1) {
              exported[index].end = message.timestamp;
            } else {
              exported.push(message);
            }
          }
        });

        // génération des messages divalto
        const divaltoMessages: divaltoMessage[] = exported.map(message => ({
          ofnr: message.ofnr,
          operation: message.operation,
          activite: message.alea,
          debut: new Date(message.start).toJSON(),
          fin: new Date(message.end).toJSON()
        }));

        // contrôle présence de données à exporter
        if (divaltoMessages.length <= 0) {
          this.response.status(204);
          return resolve({filename: "Filtre trop restrictif, aucune données à exporter"});
          // return resolve({filename: ""});
        }

        // génération du fichier csv
        const lines: string[] = [];
        // première ligne
        lines.push(Object.keys(divaltoMessages[0]).map(val => `"${val}"`).join(", "));
        for (const message of divaltoMessages) {
          lines.push(Object.values(message).map(val => `"${val}"`).join(", "));
        }

        // écriture du fichier
        await fsp.writeFile(this.path.concat(fileName), lines.join("\n").concat("\n"));

      } catch (e) {
        return reject(e);
      }
      return resolve({filename: fileName});
    });
  }

}
