<view><layout vue-id="1" title="嵙地图(点击查看大图)" bind:__l="__l" vue-slots="{{['default']}}"><view style="position:relative;"><image class="sdustMap" src="http://wx4.sinaimg.cn/large/007U8ryUly1g5h4dl25bvj318g0u0b29.jpg" data-viewImgUrl="http://wx4.sinaimg.cn/large/007U8ryUly1g5h4dl25bvj318g0u0b29.jpg" mode="widthFix" data-event-opts="{{[['tap',[['viewImg',['$event']]]]]}}" bindtap="__e"></image><view class="ImgFrom">山东科技大学新闻媒体部制</view></view></layout><layout vue-id="2" title="在线地图" bind:__l="__l" vue-slots="{{['default']}}"><view class="tips"><view class="point" style="{{'background:'+(point)+';'}}"></view><view class="info">{{info}}</view><view class="loc">{{showLongitude}}</view><view class="loc">{{showLatitude}}</view></view><map class="sdustMap" longitude="{{longitude}}" latitude="{{latitude}}" show-location></map></layout></view>