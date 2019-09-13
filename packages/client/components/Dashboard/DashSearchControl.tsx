import PropTypes from 'prop-types'
import React from 'react'
import makePlaceholderStyles from '../../styles/helpers/makePlaceholderStyles'
import ui from '../../styles/ui'
import {PALETTE} from '../../styles/paletteV2'
import styled from '@emotion/styled'
import Icon from '../Icon'
import {MD_ICONS_SIZE_18} from '../../styles/icons'

const DashSearch = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: 1
})

const DashSearchIcon = styled(Icon)({
  color: PALETTE.TEXT_GRAY,
  fontSize: MD_ICONS_SIZE_18,
  marginRight: 8
})

const DashSearchInput = styled('input')({
  appearance: 'none',
  display: 'block',
  border: 0,
  fontSize: 14,
  lineHeight: '32px',
  maxWidth: 208,
  outline: 'none',
  padding: 0,
  width: 'fit-content',
  '&:focus,:active': {
    ...makePlaceholderStyles(ui.placeholderColorFocusActive)
  }
})

const DashSearchControl = (props) => {
  const {onChange, placeholder} = props
  return (
    <DashSearch>
      <DashSearchIcon>search</DashSearchIcon>
      <DashSearchInput onChange={onChange} placeholder={placeholder} />
    </DashSearch>
  )
}

DashSearchControl.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default DashSearchControl
