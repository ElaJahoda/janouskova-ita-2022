export const urls = {
  homePage: '/',
  jsHistory: '/jshistory',
  counter: '/counter',
  toDo: '/todo',
  hackertyper: '/hackertyper',
  mortgageCalculator: '/mortgage-calculator',
  memoryGame: '/memory-game',
  httpFilter: '/http-filter',
  blogPost: '/blog',
  blogNewArticle: '/blog/new-article',
  blogArticles: '/blog/articles/:slug',
  blogUpdateArticle: '/blog/articles/update/:slug',
  jsAdoptionByMicrosoft: 'adoption-by-microsoft',
  jsCreationAtNetscape: 'creation-at-netscape',
  jsTheRiseOfJScript: 'the-rise-of-jscript',
  jsGrowthAndStandardization: 'growth-and-standardization',
  jsReachingMaturity: 'reaching-maturity',
  jsAdoptionByMicrosoftUrlAll: '/jshistory#adoption-by-microsoft',
  jsCreationAtNetscapeUrlAll: '/jshistory#creation-at-netscape',
  jsTheRiseOfJScriptUrlAll: '/jshistory#the-rise-of-jscript',
  jsGrowthAndStandardizationUrlAll: '/jshistory#growth-and-standardization',
  jsReachingMaturityUrlAll: '/jshistory#reaching-maturity',
}
export const concatUrls = (url: String) => {
  return `/blog/articles/${url}`
}

export const concatUrlUpdate = (url: String) => {
  return `/blog/articles/update/${url}`
}

export const filterUrl = (value: string) => {
  return `${process.env.REACT_APP_URL}?search=${value}`
}

export const apiUrlBlog = process.env.REACT_APP_URL_BLOG

export const urlBlog = `${apiUrlBlog}`
//`http://localhost:1234/blog`

export const blogFilterUrl = (value: string) => {
  return `${apiUrlBlog}/?search=${value}`
  //`http://localhost:1234/blog/?search=${valueInput}`
}

export const blogUpdateUrl = (slug: String) => {
  return `${apiUrlBlog}/articles/update/${slug}`
  //`http://localhost:1234/blog/articles/update/${slug}`
}

export const blogArticleUrl = (url: String) => {
  return `${apiUrlBlog}/articles/${url}`
  //`http://localhost:1234/blog/articles/${slug}`
}
