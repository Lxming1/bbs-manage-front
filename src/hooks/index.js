import { useEffect, useState } from 'react'
import { verifyRights } from '../utils'

export const useRights = (rightsObj) => {
  const [rightsArr, setRightsArr] = useState([])
  useEffect(() => {
    setRightsArr(verifyRights(rightsObj.map((item) => item.rights)))
  }, [])

  return rightsArr
}
