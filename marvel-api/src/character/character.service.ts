import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import CharacterModel from 'src/_models/character.model';

@Injectable()
export class CharacterService {

    constructor(
        @Inject('CharacterModel') private modelClass: ModelClass<CharacterModel>,
    ) { }

    async findOne(id: number): Promise<CharacterModel> {
        return this.modelClass
            .query()
            .where({ id })
            .limit(1)
            .first();
    }

    async find(id: string): Promise<CharacterModel[]> {
        return this.modelClass
            .query()
            .where({ id_usuario: id });
    }

    async findByUsuarioAndCharacter(id_usuario: string, id_character: number): Promise<CharacterModel> {
        return this.modelClass
            .query()
            .where({ id_usuario, id_character })
            .limit(1)
            .first();
    }

    async create(
        data: Partial<CharacterModel>,
    ): Promise<CharacterModel> {
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
            .deleteById(id);
    }


}
