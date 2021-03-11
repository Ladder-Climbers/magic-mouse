function dataWrapper(cmd, data) {
  if (!data) return {
    cmd: cmd
  };
  return {
    cmd: cmd,
    data: data
  };
}
function dataAngleFrame(event) {
  return dataWrapper("data_angle_frame", {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  })
}

export { dataAngleFrame, dataWrapper };