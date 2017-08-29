export default const log = (content) {
  if (process.env.DEBUG) {
    console.log(content);
  }
}
