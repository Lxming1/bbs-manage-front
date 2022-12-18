import styled from 'styled-components'

export default styled.div`
  height: 60px;
  align-items: center;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
  background-color: #373d41;

  .mainBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 80px;

    .leftContent {
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        height: 50px;

        img {
          height: 100%;
          width: auto;
        }
      }

      .tabs {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f6f6f6;
        display: flex;
        color: #121212;
        font-size: 16px;
        margin-left: 60px;

        li {
          padding: 0 20px;
          cursor: pointer;

          span {
            color: #121212;
            display: inline-block;
            line-height: 32px;
            padding: 14px 0;
            text-align: center;
            position: relative;
          }

          .tabs-active {
            font-synthesis: style;
            font-weight: 600;

            ::after {
              background: #056de8;
              bottom: -1px;
              content: '';
              height: 4px;
              left: 0;
              position: absolute;
              right: 0;
            }
          }
        }
      }
    }

    .centerContent {
      width: 320px;

      .boxBgc {
        background-color: white !important;
      }

      .search {
        border-radius: 8px;
        background: #f1f2f3;
        padding-right: 50px;
        display: flex;
        align-items: center;
        padding: 0 48px 0 4px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        line-height: 38px;
        border: 1px solid #e3e5e7;
        height: 40px;
        opacity: 0.9;
        transition: background-color 0.3s;

        :hover {
          background-color: white;
        }

        .searchInput {
          border: 2px solid transparent;
          border-radius: 6px;
          background: #f1f2f3;
          width: 100%;
          height: 32px;

          :hover {
            background-color: white;
          }
        }

        .isFocus {
          background-color: #e3e5e7 !important;
        }

        .searchIcon {
          width: 32px;
          height: 32px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          right: 7px;
          border-radius: 6px;
          cursor: pointer;

          svg {
            font-size: 20px;
          }

          :hover {
            background-color: #e3e5e7;
          }
        }

        .ant-input:focus,
        .ant-input-focused {
          box-shadow: none;
        }
      }
    }

    .rightContent {
      display: flex;
      align-items: center;

      .notices {
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #8590a6;
        margin-right: 30px;
        cursor: pointer;

        .title {
          font-size: 12px;
        }
      }

      .avatar {
        height: 30px;
        width: 30px;
        cursor: pointer;

        img {
          border-radius: 2px;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
`
