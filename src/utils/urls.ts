export const urls = {
  homePage: '/',
  coinHunter: '/coin-hunter',
  projectsPage: '/projects',
  jsHistory: '/jshistory',
  cvPage: '/cv',
  toDoRedux: '/todo-redux',
  hackertyper: '/hackertyper',
  mortgageCalculator: '/mortgage-calculator',
  memoryGame: '/memory-game',
  blogPost: '/blog',
  blogNewArticle: '/blog/new-article',
  blogArticles: '/blog/articles/:slug',
  blogArticleSlug: (url: string) => `/blog/articles/${url}`,
  blogUpdateArticle: '/blog/articles/update/:slug',
  blogUpdateArticleSlug: (url: string) => `/blog/articles/update/${url}`,
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

export const filterUrl = (value: string) => {
  return `${process.env.REACT_APP_URL}?search=${value}`
}
export const apiUrlBlog = process.env.REACT_APP_URL_BLOG

export const apiBlog = {
  filter: (value: string) => `${apiUrlBlog}/filter/?search=${value}`,
  update: (slug: String) => `${apiUrlBlog}/articles/update/${slug}`,
  detail: (url: String) => `${apiUrlBlog}/articles/${url}`,
  blog: `${apiUrlBlog}`,
}
