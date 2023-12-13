import { Layout, Menu } from "antd";
import Link from "next/link";

const { Footer, Sider, Content } = Layout;

export default function PoolProcessSider() {
  const items = [
    {
      key: "1",
      title: "TokenID Pool",
      label: (
        <Link href="/manage/pools/count">
          <div className="text-white">TokenID Pool</div>
        </Link>
      ),
    },
    {
      key: "2",
      title: "Unit Pools",
      label: (
        <Link href="/manage/pools/createUnit">
          <div className="text-white">Unit Pools</div>
        </Link>
      ),
    },
    {
      key: "3",
      title: "Drawing Pool",
      label: (
        <Link href="/manage/pools/createDrawing">
          <div className="text-white">Drawing Pools</div>
        </Link>
      ),
    },
    {
      key: "4",
      title: "Final Configurations",
      label: (
        <Link href="/manage/pools/final">
          <div className="text-white">Final Configurations</div>
        </Link>
      ),
    },
  ];
  return (
    <Sider style={{ backgroundColor: "#0c0e12" }}>
      <div className="mt-[37px] flex justify-center">
        <Link href="/manage">
          {/*<img src='/Seekers-Alliance-1.png' width={101} height={34} />*/}
        </Link>
      </div>
      <div className="mt-[60px]">
        <Menu
          theme="dark"
          style={{ backgroundColor: "#0c0e12" }}
          mode="inline"
          items={items}
          selectable={false}
        />
      </div>
    </Sider>
  );
}
