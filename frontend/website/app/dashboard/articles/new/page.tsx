import { createArticle } from '@/actions/articles'
import { notFound, redirect, } from 'next/navigation';
// import React from 'react'

type Props = {}

const CreateArticlePage = async (props: Props) => {

  const article = await createArticle();

  if(article.id){

    const url = `/dashboard/articles/${article.id}/`

    return redirect(url);
  }
  else{
    throw new Error("Could Not Create Article")
  }

}

export default CreateArticlePage