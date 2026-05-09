export type Rating = 1 | 2 | 3 | 4 | 5

export const ratingColor = (r: Rating): string =>
  ({
    1: "var(--color-rating-1)",
    2: "var(--color-rating-2)",
    3: "var(--color-rating-3)",
    4: "var(--color-rating-4)",
    5: "var(--color-rating-5)",
  })[r]

export const ratingLoadingFill = "var(--color-rating-loading)"
