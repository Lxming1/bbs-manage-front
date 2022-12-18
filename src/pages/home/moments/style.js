import styled from 'styled-components'

export default styled.div`
  width: 690px;
  margin: 0 auto;
  color: #121212;
  padding: 24px 40px;
  background-color: #fff;
  box-sizing: content-box;
  top: 70px;
  position: relative;

  .title {
    font-size: 24px;
    line-height: 1.22;
    margin-bottom: 24px;
    font-synthesis: style;
    font-weight: 600;
  }

  .user {
    height: 38px;
    display: flex;
    justify-content: space-between;

    .userLeft {
      img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
      }

      span {
        color: #444;
        margin-left: 14px;
        font-synthesis: style;
        font-weight: 600;
        font-size: 15px;
      }
    }

    .userRight {
      > button {
        height: 34px;
        border-color: #056de8;
        text-decoration: none;
        padding: 0 16px;
        width: auto !important;
        font-weight: 500;

        svg {
          font-size: 16px;
          margin-right: 6px;
        }
      }
    }
  }

  .praise {
    color: #8590a6 !important;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .content {
    font-size: 16px;
    color: #121212;
  }

  .images {
    margin-top: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 226px);
    grid-gap: 5px;

    .imgBox {
      width: 226px;
      height: 226px;
      overflow: hidden;

      img {
        border-radius: 2px;
        width: 226px;
      }
    }
  }

  .time {
    color: #8590a6;
    font-size: 14px;
    line-height: 22px;
    padding: 16px 0;
  }

  .plate {
    height: 30px;
    margin-bottom: 10px;

    .plateBtn {
      font-size: 13px;
      height: 33px;
      line-height: 30px;
      overflow: hidden;
      height: 30px;
      padding: 0 12px;
      color: #056de8;
      border-radius: 100px;
      background: rgba(5, 109, 232, 0.1);
      display: inline-block;
      cursor: pointer;

      :hover {
        background-color: rgba(5, 109, 232, 0.15);
      }
    }
  }

  .bottomBtn {
    color: #8590a6;
    display: flex;
    font-size: 14px;
    padding-top: 10px;

    .praiseBtn {
      height: 32px;
      padding: 0 12px;
      background: rgba(5, 109, 232, 0.1);
      color: #056de8;
      border: 1px solid;
      border-radius: 3px;
      border-color: transparent;

      :hover {
        background-color: rgba(5, 109, 232, 0.15);
        color: #056de8;
      }
    }

    .praiseBtn-active {
      height: 32px;
      padding: 0 12px;
      background: #056de8;
      border: 1px solid;
      border-radius: 3px;
      border-color: transparent;
      color: #fff;

      :hover {
        background: #056de8;
        color: #fff;
      }
    }

    div {
      line-height: 32px;
      cursor: pointer;
      margin-right: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        margin-right: 5px;
      }

      :hover {
        color: #76839b;
      }
    }
  }
`
