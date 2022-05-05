export interface Article {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ArticleFormRequest extends Pick<Article, 'title' | 'body'> {}