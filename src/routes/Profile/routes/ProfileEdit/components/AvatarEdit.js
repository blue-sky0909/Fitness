import './AvatarEdit.scss'
import defaultAvatar from 'assets/default-avatar.jpg'
import AvatarEditor from 'react-avatar-editor'
import Button from 'components/controls/Button'
import ErrorAlert from 'components/ErrorAlert'
import user from 'auth/user'

class AvatarEdit extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    avatarPost: PropTypes.object.isRequired,
    avatarPostRequest: PropTypes.func.isRequired,
    onAvatarChange: PropTypes.func.isRequired
  }

  onImageChange = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      this.dirty = true
      const fileReader = new FileReader()
      fileReader.onload = (onLoadEvent) => {
        this.setState({
          imageUrl: onLoadEvent.target.result
        })
      }

      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  onScaleChange = (e) => {
    this.dirty = true
    this.setState({
      scale: e.target.value * 1
    })
  }

  submit = () => {
    const image = this.editor.getImageScaledToCanvas().toDataURL()
    this.props.avatarPostRequest(user.id, image)
  }

  fileInputRef = el => { this.fileInput = el }

  onPickButtonClick = () => {
    this.fileInput.click()
  }

  componentWillMount () {
    this.dirty = false
    this.setState({
      imageUrl: this.props.avatar || defaultAvatar,
      scale: 1
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.avatarPost.loaded && !prevProps.avatarPost.loaded) {
      this.props.onAvatarChange()
      this.dirty = false
    }
  }

  render () {
    const { avatarPost } = this.props
    const { imageUrl, scale } = this.state

    return <div id='avatarEdit'>
      { avatarPost.error && <ErrorAlert error={avatarPost.error} /> }

      <div>
        <div className='avatarEdit_canvas'>
          <AvatarEditor
            ref={(x) => { this.editor = x }}
            image={imageUrl}
            width={160}
            height={160}
            border={10}
            borderRadius={90}
            color={[0, 0, 0, 0.5]} // RGBA
            scale={scale}
            rotate={0}
            crossOrigin='anonymous' />
        </div>

        <div className='avatarEdit_controls'>
          <input type='range' min='1' max='3' step='0.1' onChange={this.onScaleChange} value={scale} />
          <div>Zoom</div>
        </div>

        <input type='file' className='avatarEdit_file-input' onChange={this.onImageChange} ref={this.fileInputRef} />

        <Button
          onClick={this.onPickButtonClick}
          className='avatarEdit_pick-button'
          appearance='with-background'
          color='red'
          size='normal' >
          UPLOAD
        </Button>
      </div>
    </div>
  }
}

export default AvatarEdit
