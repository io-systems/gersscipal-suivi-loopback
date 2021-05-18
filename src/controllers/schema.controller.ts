// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {HmiRecipeRepository} from '../repositories';

export class SchemaController {

  constructor(
    @repository(HmiRecipeRepository) protected db: HmiRecipeRepository
  ) { }

  @get('/schema', {
    responses: {
      '200': {
        description: "get schema list hosted on the SQL server",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              title: 'Liste des modèles',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  })
  async getSchemas(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const rawTableList = await this.db.execute("show tables;");
        const tableList: string[] = rawTableList.map((t: any) => t.Tables_in_iotdb);
        const result: any[] = [];
        for (let t of tableList) {
          let tmp = await this.db.execute(`describe ${t}`);
          result.push({
            schema: t,
            fields: tmp
          });
        };
        return resolve(result);
      } catch (e) {
        return reject(e);
      }
    });
  }

  @get('/schema/{schema}', {
    responses: {
      '200': {
        description: "get fields of a specific schema on the SQL server",
        content: {
          'application/json': {
            schema: {
              type: 'array',
              title: "Description d'un schéma",
              items: {
                type: 'object'
              }
            }
          }
        }
      }
    }
  })
  async getSchema(
    @param.path.string('schema') schema: string
  ): Promise<any> {
    return this.db.execute(`describe ${schema}`);
  }

}
