import { ActionButton } from "@/components/ui/action-button"
import { ConnectDialog } from "@/components/wallet/connect-dialog"

export function PositionPanel() {
  return (
    <section
      aria-labelledby="position-title"
      className="border border-zoth-accent-border bg-zoth-brown-dark/80 p-5 sm:p-6"
    >
      <h2
        id="position-title"
        className="text-[11px] font-medium tracking-[0.1em] text-white uppercase"
      >
        Your position
      </h2>
      <p className="mt-2 text-[13px] text-white/80">
        Connect your wallet and Sonar account to view your position.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <ConnectDialog kind="wallet">
          <ActionButton block className="h-11">
            Connect Wallet
          </ActionButton>
        </ConnectDialog>
        <ConnectDialog kind="sonar">
          <ActionButton variant="outline" block className="h-11">
            Connect Sonar
          </ActionButton>
        </ConnectDialog>
      </div>
      <p className="mt-5 text-center text-[11px] text-zoth-text-muted">
        Your wallet and Sonar account are only used to display your position.
      </p>
    </section>
  )
}
