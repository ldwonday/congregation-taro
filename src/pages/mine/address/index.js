import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pageWithData from '../../../common/PageWithData'
import { Loading, Empty } from '../../../components'
import AddressItem from './AddressItem'
import BottomBtn from './BottomBtn'
import action from '../../../utils/action'
import EmptyImage from '../../../asset/images/img-emptyaddress.png'
import './index.scss'

@pageWithData('address')
@connect(({ address }) => ({
  ...address,
}))
export default class extends PureComponent {
  config = {
    navigationBarTitleText: '我的地址',
  }
  handleGoEdit() {
    Taro.navigateTo({
      url: '/pages/mine/address/edit/index',
    })
  }
  handleSetDefault(id) {
    console.log(id)
    this.props.dispatch(this.mappingAction('setDefault', id))
  }
  handleChooseAddress(address) {
    if (this.$router.params.chooseAddress) {
      this.props.dispatch(action('orderConfirm/save', { postDetail: address }))
      Taro.navigateBack()
    }
  }
  render() {
    const { list = [], loading } = this.props

    return (
      <View className="address">
        {loading ? (
          <Loading height="100vh" />
        ) : (
          <block>
            <View className="list">
              {list.length === 0 && (
                <Empty
                  image={EmptyImage}
                  tip="您还没有填写过收货地址"
                  desc="点击下方按钮新增地址"
                />
              )}
              {list.length > 0 &&
                list.map(item => (
                  <block>
                    <View className="line1px" />
                    <AddressItem
                      key={item}
                      data={item}
                      onClick={this.handleChooseAddress.bind(this, item)}
                      onEdit={this.handleGoEdit}
                      onSetDefault={this.handleSetDefault.bind(this, item.id)}
                    />
                  </block>
                ))}
            </View>
            <BottomBtn btnText="新增收货地址" onBtnClick={this.handleGoEdit} />
          </block>
        )}
      </View>
    )
  }
}
