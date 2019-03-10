## 性能优化
https://segmentfault.com/a/1190000017190863

## 生命周期

- Mounting
    - constructor()
    - static getDerivedStateFromProps()
    - render()
    - componentDidMount()

- updating
    - static getDerivedStateFromProps()
    - shouldComponentUpdate()
    - render()
    - getSnapshotBeforeUpdate()
    - componentDidUpdate()

- Unmounting
    - componentWillUnmount()

- error handling
    - static getDerivedStateFromError()
    - componentDidCath()