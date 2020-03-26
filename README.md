## useDebouncer

This is a custom hook that can be used to ensure that API calls are not executed too often (on every keystroke). We can set a debounce value such that we don't make the API call until the user has stopped typing for a specified amount of time (debounce value).

Hook code and inspiration from Gabe Ragland's [CodeSandBox demo](https://codesandbox.io/s/711r1zmq50) and [this repo](https://github.com/xnimorz/use-debounce).