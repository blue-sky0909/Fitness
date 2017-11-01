export const homeUrl = () => '/'

export const dashboardUrl = () => '/'

export const orderDetailsUrl = (orderId) => `/order/${orderId}`

export const loginUrl = () => '/login'

export const profileUrl = () => '/profile'

export const profileEditUrl = () => '/profile/edit'

export const notificationsUrl = () => '/notifications'

export const shopUrl = () => '/shop'

export const shopItemDetailsUrl = () => '/shop/buy'

export const mealPlansUrl = () => '/meal-plans'

export const membershipPlansUrl = () => '/membership'

export const purchaseMealPlanUrl = (plan) => `/membership/${plan}/purchase`

// export const workoutsUrl = () => '/workouts'

export const communityUrl = () => '/community'

// Blueprint URLs -- I'm sure that these will need to be changed
export const blueprintUrl = () => '/blueprint'

export const blueprintPageOneURL = () => '/blueprint/page-one'

export const blueprintPageTwoURL = () => '/blueprint/page-two'

export const blueprintPageThreeURL = () => '/blueprint/page-three'

export const blueprintPageFourURL = () => '/blueprint/page-four'
// End Blueprint URLs

// Custom meal plan blueprint urls
export const mealPlanBlueprintURL = () => '/custom-meal-plan'

export const mealPlanFormURL = () => '/custom-meal-plan/meal-plan-form'
// End Custom meal plan blueprint urls

export const forumCategoryUrl = (categoryId) => `/community/${categoryId}/threads`

export const forumThreadUrl =
  (categoryId, threadId, page = 1) => `/community/${categoryId}/threads/${threadId}/page/${page}`

export const forumNewThreadUrl = (categoryId) => `/community/${categoryId}/threads/new`

export const forumEditThreadUrl = (categoryId, threadId) => `/community/${categoryId}/threads/${threadId}/edit`

export const contactMyCoachUrl = () => '/contact-my-coach'

export const newConversationUrl = () => '/contact-my-coach/new-conversation'

export const createMealPlanUrl = () => '/meal-plans/create'

export const editMealPlanUrl = (mealplanId) => `/meal-plans/${mealplanId}`
