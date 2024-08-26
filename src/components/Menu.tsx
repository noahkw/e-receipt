import { TabMenu } from "primereact/tabmenu"
import { useLocation, useNavigate } from "react-router-dom"
import { MenuItem } from "primereact/menuitem"

const items: (MenuItem & { navigateTo: string })[] = [
  {
    label: "Dash",
    icon: "pi pi-fw pi-home",
    navigateTo: "/",
  },
  {
    label: "Receipt Upload",
    icon: "pi pi-fw pi-upload",
    navigateTo: "/receipt-upload",
  },
]

export function Menu() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="card mb-2 sticky top-0 z-10 surface-card">
      <TabMenu
        model={items.map(item => {
          item.command = () => navigate(item.navigateTo)

          return { ...item, command: () => navigate(item.navigateTo) }
        })}
        activeIndex={items.findIndex(
          item => item.navigateTo === location.pathname,
        )}
      />
    </div>
  )
}
