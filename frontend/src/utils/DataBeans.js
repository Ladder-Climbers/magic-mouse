function dataWrapper(cmd, data) {
  if (!data) return {
    cmd: cmd
  };
  let result = {
    cmd: cmd,
    data: data
  };
  if (cmd != "data_angle_frame")
    console.log("DataWrapper: will send", result);
  return result;
}
function dataAngleFrame(event) {
  return dataWrapper("data_angle_frame", {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  })
}

export { dataAngleFrame, dataWrapper };