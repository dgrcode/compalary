export const COMPARISON_TOGGLE_VISIBLE = 'COMPARISON_TOGGLE_VISIBLE'

export const comparisonToggleVisible = comparisonKey => ({
  type: COMPARISON_TOGGLE_VISIBLE,
  payload: {
    key: comparisonKey
  }
})
