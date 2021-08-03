import { Model } from 'objection';

export default class ComicModel extends Model {
    static tableName = 'tb_comic_favoritos';

    id: number;
    id_usuario: string;
    id_comic: number;
    title: string;
    description: string;
    thumbnailPath: string;
    thumbnailPathExtension: string;
    pageCount: string;
    date: Date;

    async $beforeInsert(ctx): Promise<void> {
        await super.$beforeInsert(ctx);
        this.date = new Date();
    }
}
