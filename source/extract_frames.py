import cv2
import os

# this script will take a videofile and create an image sequence out of it for animation in JS
def extract_frames(video_path, output_folder, num_frames, frame_size, jpeg_quality=90):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_step = total_frames // num_frames

    for i in range(num_frames):
        frame_pos = i * frame_step
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_pos)
        success, frame = cap.read()

        if success:
            resized_frame = cv2.resize(frame, frame_size, interpolation=cv2.INTER_LINEAR)
            output_file = os.path.join(output_folder, f"frame_{i:03d}.jpg")  # Change the file extension to .jpg
            cv2.imwrite(output_file, resized_frame, [cv2.IMWRITE_JPEG_QUALITY, jpeg_quality])  # Add the JPEG quality parameter
        else:
            print(f"Failed to read frame at position {frame_pos}")

    cap.release()

# this is the actual portion of the python code that runs when you execute the script or press play in your editor
if __name__ == "__main__":

    video_path = "source/cat.mp4"
    output_folder = "image-sequence"
    num_frames = 50
    frame_size = tuple(map(int, "800x600".split("x")))
    jpeg_quality = 35  # Set the desired JPEG compression quality (1-100, higher means better quality)

    extract_frames(video_path, output_folder, num_frames, frame_size, jpeg_quality)