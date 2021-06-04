// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, param, post, requestBody} from '@loopback/rest';
import {AngularDataFilter, FilterContent} from '../models';
import {AngularDataFilterRepository} from '../repositories';

export class AngularDataFilterController {
  constructor(
    @repository(AngularDataFilterRepository)
    public angularDataFilterRepository: AngularDataFilterRepository
  ) { }

  // création, ajout, mise à jour d'un filtre dans un tableau hash
  @post('/angular-data-filters/{hash}')
  async create(
    @param.path.string('hash') hash: string,
    @requestBody({description: 'Custom filter'}) filterContent: FilterContent
  ): Promise<void> {
    const res = await this.angularDataFilterRepository.get(hash);
    let newFilter: AngularDataFilter;
    if (res == null) {
      newFilter = new AngularDataFilter({
        hash: hash,
        content: [filterContent]
      });
      await this.angularDataFilterRepository.set(hash, newFilter);

    } else {
      if (res.content && res.content.length > 0) {
        // look after filter
        const index = res.content.findIndex(fil => fil.name === filterContent.name);
        if (index > -1) {
          // filter name exists : rewrite filter content to existing filters
          res.content[index].content = filterContent.content;
          newFilter = new AngularDataFilter({
            hash: hash,
            content: res.content
          });
        } else {
          // new filter
          res.content.push(filterContent)
          newFilter = new AngularDataFilter({
            hash: hash,
            content: res.content
          });
        }
      } else {
        // new filter
        newFilter = new AngularDataFilter({
          hash: hash,
          content: [filterContent]
        });
      }
      await this.angularDataFilterRepository.set(hash, newFilter);
    }
  }

  // obtenir le contenu stocké pour hash
  @get('/angular-data-filters/{hash}')
  async get(
    @param.path.string('hash') hash: string
  ): Promise<AngularDataFilter> {
    return this.angularDataFilterRepository.get(hash);
  }

  // supprimer un filtre du tableau de filtres hash
  @del('/angular-data-filters/{hash}/{name}')
  async deleteFilter(
    @param.path.string('hash') hash: string,
    @param.path.string('name') name: string,
  ): Promise<void> {
    const res = await this.angularDataFilterRepository.get(hash);
    if (!res.content || res.content.length <= 0) return;
    // look after filter name
    const index = res.content.findIndex(fil => fil.name === name);
    if (index < 0) return;
    res.content.splice(index, 1);
    const newFilter = new AngularDataFilter({
      hash: hash,
      content: res.content
    });
    await this.angularDataFilterRepository.set(hash, newFilter);
  }

  // supprimer tout le contenu pour un hash
  @del('angular-data-filters/{hash}')
  async delete(
    @param.path.string('hash') hash: string
  ): Promise<void> {
    await this.angularDataFilterRepository.delete(hash);
  }

}
