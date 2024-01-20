export const getPriorityColor = (p) => {
  if (p < 0.5) {
    return 'green'
  } else if (p < 0.75) {
    return 'orange'
  } else {
    return 'red'
  }
}