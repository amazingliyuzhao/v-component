/* eslint-disable no-shadow */
/**
 *
 * @description 请求
 */

// @ts-ignore
import request from './request';
import type { IndexResData, HomeRankType } from './index.type';

export * from './index.type';

enum URL {
  index = '/vas/biz/api/valentine2023/index',
  getCarComponent = '/vas/biz/api/valentine2023/getCarComponent',
  recommendUser = '/vas/biz/api/valentine2023/recommendUser',
  checkCp = '/vas/biz/api/valentine2023/checkCpSts',
  shareLand = '/vas/biz/api/valentine2023/getShareLanding',
  memberList = '/vas/biz/api/common/getGroupMembersByPage',
  getProfile = '/vas/biz/api/common/getProfile',
}

const getCommonParams = () => ({
  data: Date.now(),
});

export default class IndexReq {
  // 首页
  static index(type: HomeRankType, page: number, pageSize = 20) {
    return request<IndexResData>(URL.index, {
      type,
      page,
      pageSize,
      ...getCommonParams(),
    });
  }
}
