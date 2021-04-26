// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {AngularDataFilter, FilterContent} from '../models';
import {AngularDataFilterRepository} from '../repositories';

export class AngularDataFilterController {
  constructor(
    @repository(AngularDataFilterRepository)
    public AngularDataFilterRepository: AngularDataFilterRepository
  ) { }

  @post('/angular-data-filters/{hash}')
  async create(
    @param.path.string('hash') hash: string,
    @requestBody({description: 'Custom filter'}) filterContent: FilterContent
  ): Promise<void> {
    const res = await this.AngularDataFilterRepository.get(hash);
    let newFilter: AngularDataFilter;
    if (res == null) {
      newFilter = new AngularDataFilter({
        hash: hash,
        content: [filterContent]
      });
      await this.AngularDataFilterRepository.set(hash, newFilter);

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
      await this.AngularDataFilterRepository.set(hash, newFilter);
    }
  }

  @get('/angular-data-filters/{hash}')
  async get(
    @param.path.string('hash') hash: string
  ): Promise<AngularDataFilter> {
    const cf = await this.AngularDataFilterRepository.get(hash);
    if (cf == null) {
      throw new HttpErrors.NotFound(
        `Le filtre ${hash} n'a pas été trouvé.`
      )
    } else {
      return cf;
    }
  }

  // @put('/angular-data-filters/{hash}')
  // async update(
  //   @param.path.string('hash') hash: string,
  //   @requestBody({description: 'Custom filter'}) newCustomFilter: AngularDataFilter
  // ): Promise<void> {
  //   await this.AngularDataFilterRepository.set(customFilterName, newCustomFilter.content);
  // }
}
