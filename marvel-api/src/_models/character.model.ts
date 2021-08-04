import { Model } from 'objection';

export default class CharacterModel extends Model {
    static tableName = 'tb_character_favoritos';

    id: number;
    id_usuario: string;
    id_character: number;
    name: string;
    description: string;
    thumbnailPath: string;
    thumbnailPathExtension: string;
    date: Date;

    async $beforeInsert(ctx): Promise<void> {
        await super.$beforeInsert(ctx);
        this.date = new Date();
    }
}
