import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";

import { useToast, useToastRegion } from "@react-aria/toast";
import { ToastQueue, useToastQueue } from "@react-stately/toast";
import { useRef } from "react";
import { createPortal } from "react-dom";
import TablerInfoCircleFilled from "virtual:icons/tabler/info-circle-filled";

import { Button } from "#/components/ui/button";

type ToastOptions = {
	name: string;
	onRestore: () => void;
};

const toastQueue = new ToastQueue<ToastOptions>({
	maxVisibleToasts: 5,
});

const Toast = ({ state, ...props }: AriaToastProps<ToastOptions> & { state: ToastState<ToastOptions> }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { closeButtonProps, titleProps, toastProps } = useToast(props, state, ref);

	const handleUndoPress = () => {
		state.close(props.toast.key);
		props.toast.content.onRestore();
	};

	return (
		<div
			style={{
				"--align-items": "start",
				"--background-color": "var(--color_sand-1)",
				"--border-color": "var(--color_orange-7)",
				"--border-radius": "var(--radii_md)",
				"--border-style": "var(--line-style_solid)",
				"--border-width": 0.5,
				"--box-shadow": "var(--shadow_base)",
				"--display": "flex",
				"--gap": 3,
				"--p": 4,
				"--w": "var(---,100%)",
			}}
			ref={ref}
			{...toastProps}
		>
			<TablerInfoCircleFilled
				style={{
					"--color": "var(--color_orange-12)",
					"--font-size": "var(--font-size_2xl)",
				}}
			/>
			<div
				style={{
					"--display": "flex",
					"--flex-direction": "column",
					"--gap": 4,
					"--width": "var(---,100%)",
				}}
			>
				<h3
					style={{
						"--font-size": "var(--font-size_lg)",
						"--font-weight": "var(--weight_medium)",
					}}
					{...titleProps}
				>
					Successfully deleted event &quot;{props.toast.content.name}&quot;
				</h3>
				<div
					style={{
						"--align-items": "center",
						"--display": "flex",
						"--gap": 4,
						"--justify-content": "flex-end",
					}}
				>
					<Button onPress={handleUndoPress}>Undo</Button>
					<Button variant="muted" {...closeButtonProps}>
						Discard
					</Button>
				</div>
			</div>
		</div>
	);
};

export const ToastRegion = () => {
	const ref = useRef<HTMLElement>(null);
	const state = useToastQueue(toastQueue);
	const { regionProps } = useToastRegion({}, state, ref);

	return state.visibleToasts.length > 0
		? createPortal(
				<div
					style={{
						"--bottom": 4,
						"--display": "flex",
						"--flex-direction": "column",
						"--gap": 4,
						"--max-width": "var(---, min(calc(100vw - 32px), 24rem))",
						"--position": "absolute",
						"--rac-focus-visible_outline-color": "var(--color_blue-8)",
						"--rac-focus-visible_outline-offset": 0.75,
						"--rac-focus-visible_outline-style": "var(--line-style_solid)",
						"--rac-focus-visible_outline-width": 0.5,
						"--right": 4,
						"--width": "var(---, 100%)",
						"--z-index": "var(--z_100)",
					}}
					className="absolute right-4 top-4 z-20 flex w-full max-w-[min(calc(100vw-theme(spacing.8)),31rem)] flex-col gap-4 outline-none ring-scorpion-950 rac-focus-visible:ring-2"
					{...regionProps}
				>
					{state.visibleToasts.map(toast => (
						<Toast key={toast.key} state={state} toast={toast} />
					))}
				</div>,
				document.body,
			)
		: null;
};

const TOAST_TIMEOUT = 5_000;

// eslint-disable-next-line react-refresh/only-export-components
export const addEventDeletionNotification = (options: ToastOptions) =>
	toastQueue.add(
		{ ...options },
		{
			priority: 1_000,
			timeout: TOAST_TIMEOUT,
		},
	);
