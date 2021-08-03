import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import ComicModel from 'src/_models/comic.model';

@Injectable()
export class ComicService {

    constructor(
        @Inject('ComicModel') private modelClass: ModelClass<ComicModel>,
    ) { }

    async findOne(id: number): Promise<ComicModel> {
        return this.modelClass
            .query()
            .where({ id })
            .limit(1)
            .first();
    }

    async find(id: string): Promise<ComicModel> {
        return this.modelClass
            .query()
            .where({ id_usuario: id })
            .limit(1)
            .first();
    }

    async create(
        data: Partial<ComicModel>,
    ): Promise<ComicModel> {
        return this.modelClass
            .query()
            .insert(data)
            .first();
    }

    async delete(
        id: number,
    ): Promise<number> {
        return this.modelClass
            .query()
            .delete()
            .where({ id });
    }


}
