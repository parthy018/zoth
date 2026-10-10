import { ActionButton } from "@/components/ui/action-button"
import { CornerTicks } from "@/components/ui/corner-ticks"
import { ConnectDialog } from "@/components/wallet/connect-dialog"

export function PositionPanel() {
  return (
    <section
      aria-labelledby="position-title"
      className="relative border border-zoth-accent-border bg-zoth-brown-dark/80 p-5 sm:p-6"
    >
      <CornerTicks size={8} />
      <h3
        id="position-title"
        className="text-[11px] font-medium tracking-[0.1em] text-zoth-text-muted uppercase"
      >
        Your position
      </h3>
      <p className="mt-2 text-[13px] text-zoth-text-muted">
        Connect your wallet and Sonar account to view your position.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ConnectDialog kind="wallet">
          <ActionButton block>Connect Wallet</ActionButton>
        </ConnectDialog>
        <ConnectDialog kind="sonar">
          <ActionButton variant="outline" block>
            Connect Sonar
          </ActionButton>
        </ConnectDialog>
      </div>
    </section>
  )
}
