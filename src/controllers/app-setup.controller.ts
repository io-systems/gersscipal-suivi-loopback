// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, param, post, requestBody} from '@loopback/rest';
import {AppSetup, AppSetupValue} from '../models';
import {AppSetupRepository} from '../repositories';


export class AppSetupController {
  constructor(
    @repository(AppSetupRepository)
    public db: AppSetupRepository
  ) { }


  // création, ajout, mise à jour d'un paramètre d'application
  @post('/app-setup/{key}')
  async createKey(
    @param.path.string('key') key: string,
    @requestBody({description: 'Valeur du paramètre'}) value: AppSetupValue
  ): Promise<void> {
    await this.db.set(key, value);
  }

  // obtenir le contenu stocké pour key
  @get('/app-setup/{key}', {
    responses: {
      '200': {
        description: 'Get App setup parameter',
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                key: {type: "string"},
                value: {
                  type: "object"
                }
              }
            }
          }
        },
      },
    },
  })
  async getKey(
    @param.path.string('key') key: string
  ): Promise<AppSetup> {
    return this.db.get(key);
  }

  // supprimer tout le contenu d'un paramètre pour un key
  @del('app-setup/{key}')
  async deleteKey(
    @param.path.string('key') key: string
  ): Promise<void> {
    await this.db.delete(key);
  }

}
