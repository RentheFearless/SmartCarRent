import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 text-center text-danger">
          <h3>Щось пішло не так</h3>
          <details className="mt-3">
            <summary>Деталі помилки</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
          </details>
          <button className="btn btn-olimp mt-3" onClick={() => window.location.reload()}>
            Перезавантажити
          </button>
        </div>
      )
    }

    return this.props.children
  }
}