import NewMomentWrapper from './style'
import { Input, Image, Checkbox, Select, Form, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { getPlateList } from '@/service/plate'
import { xmMessage } from '@/utils'
import { CloseCircleFilled, PictureOutlined, RightOutlined } from '@ant-design/icons'
import { sendMoment, uploadPicture } from '@/service/moment'
import { useNavigate } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { verifyLogin } from '../../../utils'

export default () => {
  const { isLogin } = useStoreInfo('isLogin')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [palteOptions, setPalteOptions] = useState([])
  const [previewPicList, setPreviewPicList] = useState([])
  const [uploadPicList, setUploadPicList] = useState([])
  const [fields, setFields] = useState([
    {
      name: ['title'],
      value: '',
    },
    {
      name: ['content'],
      value: '',
    },
    {
      name: ['plate'],
      value: '',
    },
    {
      name: ['visible'],
      value: false,
    },
  ])

  const onChange = (value) => setFields(value)

  const previewPic = (e) => {
    const fileList = [...e.target.files]
    if (previewPicList.length + fileList.length > 9) return xmMessage(2, '最多上传9张配图')
    const reg = new RegExp(/^image\/(jpe?g|png|gif|svg)$/)
    if (fileList.length) {
      if (fileList.every((item) => reg.test(item.type))) {
        fileList.forEach((item, index) => {
          const id = new Date().getTime() + index
          item.id = id
          setUploadPicList((pics) => [...pics, item])
          const reader = new FileReader()
          reader.readAsDataURL(item)
          reader.onload = (e) => {
            setPreviewPicList((pics) => [
              ...pics,
              {
                id,
                data: e.target.result,
              },
            ])
          }
        })
      }
    }
  }

  const removeImg = (id) => {
    const filterFn = (p) => p.filter((i) => i.id !== id)
    setUploadPicList(filterFn)
    setPreviewPicList(filterFn)
  }
  const upload = async (result) => {
    const { id: momentId } = result.data
    if (uploadPicList.length) {
      const form = new FormData()
      uploadPicList.forEach((item) => {
        form.append('picture', item)
      })
      return await uploadPicture(momentId, form)
    }
    return result
  }

  const submit = async () => {
    const [title, content, plate, visible] = fields
    if ([title.value, content.value, plate.value].includes('')) {
      return xmMessage(2, '缺少必填项')
    }
    setLoading(true)
    const obj = {
      title: title.value,
      content: content.value,
      plateId: plate.value,
      visible: visible.value ? 1 : 0,
    }
    try {
      let result = await sendMoment(obj)
      result = await upload(result)
      setLoading(false)
      xmMessage(result.code, result.message)
      navigate('/')
    } catch (e) {
      console.log(e)
      xmMessage(2, '未知错误')
    }
  }

  useEffect(() => {
    verifyLogin(isLogin).then(() => {
      getPlateList().then(({ data: plateList }) => {
        setPalteOptions(
          plateList.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        )
      })
    })
  }, [])

  return (
    <NewMomentWrapper className="boxShadow">
      {loading && (
        <div className="loading">
          <Spin size="large" />
        </div>
      )}
      <h1>发表动态</h1>
      <a href={`#/`} className="back">
        返回首页 <RightOutlined />
      </a>
      <Form
        className="form"
        autoComplete="off"
        fields={fields}
        initialValues={{ visible: false }}
        onFieldsChange={(_, allFields) => onChange(allFields)}>
        <Form.Item label="标题" name="title" required>
          <Input maxLength={50} showCount style={{ width: '90%' }} />
        </Form.Item>
        <Form.Item label="内容" name="content" required>
          <Input.TextArea maxLength={1000} showCount autoSize={{ minRows: 4 }} />
        </Form.Item>
        <div className="newBottomBox">
          <div className="newBottomLeft">
            <div className="imageList">
              <Image.PreviewGroup>
                {previewPicList?.map((item) => (
                  <div className="image" key={item.id}>
                    <i className="removeImage" onClick={() => removeImg(item.id)}>
                      <CloseCircleFilled />
                    </i>
                    <Image src={item.data} />
                  </div>
                ))}
              </Image.PreviewGroup>
              {previewPicList.length < 9 && (
                <>
                  <label htmlFor="momentPics">
                    <div className="uploadBtn">
                      <PictureOutlined />
                      <div className="uploadSpan">Upload</div>
                    </div>
                  </label>
                  <input hidden multiple type="file" id="momentPics" onChange={previewPic} />
                </>
              )}
            </div>
          </div>
          <div className="newBottomRight">
            <Form.Item label="板块" name="plate" required>
              <Select options={palteOptions} style={{ width: '100px' }} />
            </Form.Item>
            <Form.Item label="匿名" name="visible" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item name="submit">
              <button className="sendBtn" onClick={submit}>
                发布
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </NewMomentWrapper>
  )
}
