export class Timer {
  private startTime: number | null = null
  private endTime: number | null = null
  private isRunning = false

  start(): void {
    if (this.isRunning) {
      return
    }

    this.startTime = Date.now()
    this.isRunning = true
  }

  stop(): void {
    if (!this.isRunning) {
      return
    }

    this.endTime = Date.now()
    this.isRunning = false
  }

  getDuration(): number | void {
    if (this.isRunning) {
      return
    }

    if (this.startTime === null || this.endTime === null) {
      return
    }

    const duration = this.endTime - this.startTime
    return duration
  }
}
