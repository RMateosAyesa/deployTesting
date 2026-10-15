export class ValueObject<Properties> {
  protected props: Properties

  constructor(props: Properties) {
    this.props = { ...props }
  }
}
