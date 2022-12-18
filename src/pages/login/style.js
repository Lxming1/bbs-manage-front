import styled from 'styled-components'

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2b4b6b;

  .box {
    width: 420px;
    box-shadow: 0 0 10px #ddd;
    box-sizing: border-box;
    padding: 30px 30px 10px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;

    h2 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
    }

    .checkbox {
      display: flex;
      line-height: 16px;
      font-size: 12px;
      margin-bottom: 15px;
    }

    .loginBtn {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }

    .loginFooter {
      text-align: center;
      margin-top: 20px;
    }
  }
`
