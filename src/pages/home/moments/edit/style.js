import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  background-color: white;
  margin: 0 auto;
  padding: 20px 40px;
  position: relative;
  top: 70px;

  .loading {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .back {
    position: absolute;
    right: 28px;
    top: 28px;
    color: #8590a6;
    font-size: 14px;
    cursor: pointer;
  }

  .newBottomBox {
    display: flex;
    margin-bottom: 15px;

    .newBottomLeft {
      padding-left: 50px;
      flex: 1;
    }

    .newBottomRight {
      padding-left: 50px;
      padding-top: 30px;
      flex: 1;

      .ant-form-item {
        margin-bottom: 40px !important;
      }
    }
  }

  .imageList {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 112px);
    grid-template-rows: repeat(3, 112px);
    grid-gap: 5px;
    /* height: 306px; */

    .image {
      position: relative;

      :hover {
        .removeImage {
          display: inline;
        }
      }

      .removeImage {
        cursor: pointer;
        position: absolute;
        right: 4px;
        top: 4px;
        z-index: 1;
        color: #ccc;
        display: none;
      }

      img {
        border-radius: 4px;
      }
    }
  }

  .uploadBtn {
    width: 112px;
    height: 112px;
    background-color: rgba(0, 0, 0, 0.02);
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    transition: border-color 0.3s;
    text-align: center;
    padding: 20px;
    border-radius: 8px;

    :hover {
      border-color: #1677ff;
    }

    svg {
      margin-top: 14px;
      font-size: 20px;
    }
  }
`
