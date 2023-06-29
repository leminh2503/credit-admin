# Import biến styles từ figma tự động bằng script
Đối với đa số dự án, việc sử dụng lại các biến màu, style là rất cần thiết nhng đôi khi dev luôn tạo thêm biến mới nên script được tạo ra để đồng bộ các style từ figma về

## 1. Cấu hình các thông số trước khi import
Có 3 thông số sau cần phải cấu hình trước khi chạy import tự động đó chính là: figma token, figma fileId, page trong file figma

### 1.1. Hướng dẫn cấu hình figma token
[Hướng dẫn từ trang chủ](https://www.figma.com/developers/api#access-tokens)

Ví dụ: `figd_PZ23wpma0KBs4GO5ihBE4DlK6V3hyHqJL0pJxFlM`

Sau đó tại file [package.json](..%2F..%2Fpackage.json) tìm đến các giá trị `FIGMA_TOKEN` và thay bằng giá trị trên, ví dụ:
```
    "generate-icon": "cross-env FIGMA_TOKEN=figd_PZ23wpma0KBs4GO5ihBE4DlK6V3hyHqJL0pJxFlM figma-export use-config scripts/generate-icon/.figmaexportrc.components.js && eslint --fix ./components/Icon",
    "generate-style": "cross-env FIGMA_TOKEN=figd_PZ23wpma0KBs4GO5ihBE4DlK6V3hyHqJL0pJxFlM figma-export use-config scripts/generate-styles/.figmaexportrc.styles.js",
```

### 1.2. Hướng dẫn lấy figmaId
Ví dụ chúng ta có link sau https://www.figma.com/file/fzYhvQpqwhZDUImRz431Qo/figma-export?type=design&node-id=254-963&mode=design&t=xG8kXgVQYFJtbN3g-0

Thì figmaId ở đây sẽ là: `fzYhvQpqwhZDUImRz431Qo`

Sau đó tại file [.figmaexportrc.styles.js](..%2F..%2Fscripts%2Fgenerate-styles%2F.figmaexportrc.styles.js) tìm đến `fileId` ta thay giá trị vào, ví dụ:
```
module.exports = {
  commands: [
    ['components', {
      fileId: 'fzYhvQpqwhZDUImRz431Qo',
```

### 1.3.Hướng dẫn lấy page trong file figma
Trong một file figma chúng ta thường có nhiều page cho các màn hình khác nhau và thường sẽ có một page riêng để định nghĩa các icon
Thì ở đây chúng ta sẽ lấy các page cần lấy icon: `['icon']`

Sau đó tại file [.figmaexportrc.styles.js](..%2F..%2Fscripts%2Fgenerate-styles%2F.figmaexportrc.styles.js) tìm đến `onlyFromPages` ta thay giá trị vào, ví dụ:
```
module.exports = {
  commands: [
    ['components', {
      fileId: '0hfW206cgPGjJ3GRHJ9pAP',
      onlyFromPages: ['icons'],
```

Sau đó ta có thể set mã màu mặc định cho icon qua component [IconWrapper](..%2F..%2Fcomponents%2FIcon%2FIconWrapper%2Findex.tsx) tìm đến `colorProp` và set giá trị mặc định, ví dụ:
```typescript jsx
export function IconWrapper({
  icon,
  color: colorProp = "#fff",
  size: sizeProp,
  autoSize,
  ...restProps
}: {icon: React.ReactNode} & IconWrapperProps): JSX.Element {
  ...
}
```

# 2. Import tự động
Chạy câu lệnh `yarn generate-icon` để bắt đầu việc import icon từ figma. Tất cả icon sau khi import xong sẽ xuất hiện ở [Icon](..%2F..%2Fcomponents%2FIcon)

Để có thể preview tất cả các icon vừa mới import xong, chạy câu lệnh `yarn generate-icon-previewer`. Một file mới sẽ ược tạo ra trong folder pages [icon-gallery.tsx](..%2F..%2Fpages%2Ficon-gallery.tsx). Truy cập vào [localhost:3000/icon-gallery](http://localhost:3000/icon-gallery) để xem preview các icon vừa import

Khi sử dụng các icon thì ta sẽ import từ file index chứ không import trực tiếp từng file icon, ví dụ:
```typescript jsx
import {IssueOpened} from "@components/Icon";
```
