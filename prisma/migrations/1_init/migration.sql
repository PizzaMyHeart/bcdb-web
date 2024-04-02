-- CreateEnum
CREATE TYPE "articlesource" AS ENUM ('GUARDIAN', 'TORDOTCOM');

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "published_date" TIMESTAMPTZ(6) NOT NULL,
    "crawled_date" TIMESTAMPTZ(6) NOT NULL,
    "comment_close_date" TIMESTAMPTZ(6),
    "source" "articlesource" NOT NULL,
    "is_closed_for_comments" BOOLEAN NOT NULL,
    "num_comments" INTEGER,
    "permalink" VARCHAR NOT NULL,
    "guardian_short_url" VARCHAR,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles_tags" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "articles_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "guardian_id" INTEGER NOT NULL,
    "body" VARCHAR NOT NULL,
    "permalink" VARCHAR NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "author_name" VARCHAR NOT NULL,
    "parent_guardian_id" INTEGER,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "permalink" VARCHAR NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_guardian_id_key" ON "comments"("guardian_id");

-- AddForeignKey
ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_guardian_id_fkey" FOREIGN KEY ("parent_guardian_id") REFERENCES "comments"("guardian_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

